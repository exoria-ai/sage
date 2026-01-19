# SAGE Development Workflow Skill

## Pre-Commit Checklist

Before pushing any code changes:

1. **Run the build locally**
   ```bash
   npm run build
   ```
   This catches TypeScript errors before they fail in Vercel.

2. **Run tests if applicable**
   ```bash
   npx vitest run           # Unit tests
   npx tsx scripts/test-render-map.ts  # Integration tests
   ```

3. **Update homepage if MCP tools changed**
   If you modified tool schemas, descriptions, or added new tools,
   update `app/page.tsx` to keep documentation in sync.

4. **Commit with descriptive message**
   Use conventional commit style when appropriate.

## Vercel Deployment

### Monitoring Deployments
- Dashboard: https://vercel.com/ai-machine-dream/sage/deployments
- Auto-deploys on push to `main`
- Use Chrome browser to check deployment status if builds fail

### Debugging Build Failures
1. Check Vercel deployment logs (use browser tools)
2. Common issues:
   - Type mismatches after refactoring
   - Missing imports
   - Old types in cached files
3. Run `npm run build` locally to reproduce

## Chrome Browser Usage

You have the Claude-in-Chrome extension available. Use it for:

### Checking Vercel Deployments
```
navigate to: https://vercel.com/ai-machine-dream/sage/deployments
screenshot to see build status
read_page to get deployment details
```

### Testing SAGE Production
```
navigate to: https://sage-three-theta.vercel.app
screenshot to verify homepage
navigate to: https://sage-three-theta.vercel.app/map?apn=0030-251-020
screenshot to test map rendering
```

### Debugging ArcGIS Services
```
navigate to: https://services2.arcgis.com/SCn6czzcqKAFwdGU/ArcGIS/rest/services
screenshot to see available services
```

## MCP Tool Development Workflow

### Adding a New Tool

1. **Create implementation** in `lib/tools/new-tool.ts`
   - Keep business logic separate from MCP concerns
   - Return structured results (not MCP response format)

2. **Create definition** in `lib/tools/definitions/new-tool.ts`
   - Use `defineTool()` helper
   - Write detailed LLM-facing description
   - Define Zod schema for inputs

3. **Export from index** in `lib/tools/definitions/index.ts`
   - Import tool array
   - Add to `allTools` aggregation
   - Update `getToolStats()` if new category

4. **Update homepage** in `app/page.tsx`
   - Add example usage
   - Place in appropriate category card

5. **Test locally**
   - `npm run build` for type checking
   - `npx tsx scripts/test-new-tool.ts` for integration

6. **Commit and push**
   - Build passes → Vercel auto-deploys

### Modifying Existing Tools

1. Update implementation in `lib/tools/*.ts`
2. Update definition in `lib/tools/definitions/*.ts` if schema/description changed
3. Update homepage if user-facing behavior changed
4. Run `npm run build` before committing

## CLAUDE.md Best Practices

From Claude Code best practices:

- Keep CLAUDE.md concise and human-readable
- Document common commands, code style, workflows
- Use the `#` key during sessions to add notes
- Iterate on instructions for better model adherence

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run ESLint

# Testing
npx vitest               # Run unit tests
npx vitest run           # Run once (no watch)
npx tsx scripts/test-render-map.ts  # Map rendering tests

# Git
git status              # Check changes
git diff                # View unstaged changes
git log --oneline -10   # Recent commits
```

## Context Management

- Use `/clear` between unrelated tasks to reset context
- For complex tasks, break into subtasks with TodoWrite
- Use subagents for exploration before implementation
- When stuck, step back and re-read relevant files
