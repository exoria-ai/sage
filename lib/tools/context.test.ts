/**
 * Context Tool Tests
 *
 * Tests for the Solano context reference retrieval tool.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSolanoContext, listAvailableTopics } from './context';

// Mock the fs module
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
  },
}));

import { promises as fs } from 'fs';

describe('getSolanoContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('valid topics', () => {
    it('returns content for valid topic', async () => {
      const mockContent = '# Zoning Codes\n\nThis is zoning info...';
      vi.mocked(fs.readFile).mockResolvedValue(mockContent);

      const result = await getSolanoContext({ topic: 'zoning' });

      expect(result.success).toBe(true);
      expect(result.topic).toBe('zoning');
      expect(result.content).toBe(mockContent);
    });

    it('normalizes topic to lowercase', async () => {
      vi.mocked(fs.readFile).mockResolvedValue('content');

      const result = await getSolanoContext({ topic: 'ZONING' });

      expect(result.success).toBe(true);
      expect(result.topic).toBe('zoning');
    });

    it('trims whitespace from topic', async () => {
      vi.mocked(fs.readFile).mockResolvedValue('content');

      const result = await getSolanoContext({ topic: '  flood  ' });

      expect(result.success).toBe(true);
      expect(result.topic).toBe('flood');
    });

    it('handles topic aliases (zoning-codes -> zoning-codes.md)', async () => {
      vi.mocked(fs.readFile).mockResolvedValue('zoning content');

      const result1 = await getSolanoContext({ topic: 'zoning' });
      const result2 = await getSolanoContext({ topic: 'zoning-codes' });

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      // Both should read from zoning-codes.md
      expect(fs.readFile).toHaveBeenCalledTimes(2);
    });
  });

  describe('invalid topics', () => {
    it('returns error for unknown topic', async () => {
      const result = await getSolanoContext({ topic: 'unknown-topic' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('UNKNOWN_TOPIC');
      expect(result.message).toContain('unknown-topic');
      expect(result.available_topics).toBeDefined();
      expect(result.available_topics!.length).toBeGreaterThan(0);
    });

    it('returns error for empty topic', async () => {
      const result = await getSolanoContext({ topic: '' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('UNKNOWN_TOPIC');
    });
  });

  describe('file errors', () => {
    it('returns FILE_NOT_FOUND error when file missing', async () => {
      const error = new Error('ENOENT: no such file or directory');
      vi.mocked(fs.readFile).mockRejectedValue(error);

      const result = await getSolanoContext({ topic: 'zoning' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('FILE_NOT_FOUND');
      expect(result.suggestion).toContain('not be deployed');
    });

    it('returns READ_ERROR for other file errors', async () => {
      const error = new Error('Permission denied');
      vi.mocked(fs.readFile).mockRejectedValue(error);

      const result = await getSolanoContext({ topic: 'zoning' });

      expect(result.success).toBe(false);
      expect(result.error_type).toBe('READ_ERROR');
      expect(result.message).toContain('Permission denied');
    });
  });
});

describe('listAvailableTopics', () => {
  it('returns list of available topics', () => {
    const topics = listAvailableTopics();

    expect(Array.isArray(topics)).toBe(true);
    expect(topics.length).toBeGreaterThan(0);
  });

  it('deduplicates topics that map to same file', () => {
    const topics = listAvailableTopics();

    // Topics should be unique (some map to same file like zoning/zoning-codes)
    const uniqueTopics = new Set(topics);
    expect(topics.length).toBe(uniqueTopics.size);
  });

  it('includes descriptions', () => {
    const topics = listAvailableTopics();

    for (const topic of topics) {
      expect(topic).toContain(':'); // Format is "topic: description"
    }
  });

  it('covers expected topics', () => {
    const topics = listAvailableTopics();
    const topicsStr = topics.join('\n').toLowerCase();

    // Should have entries for main categories
    expect(topicsStr).toContain('zoning');
    expect(topicsStr).toContain('flood');
    expect(topicsStr).toContain('fire');
    expect(topicsStr).toContain('adu');
    expect(topicsStr).toContain('contacts');
  });
});
