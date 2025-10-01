# Code Quality Setup

This project uses Prettier and Husky to maintain code quality and consistency.

## Tools

### Prettier

Prettier is an opinionated code formatter that ensures consistent code style across the project.

**Configuration:** `.prettierrc`

- Single quotes for JavaScript/TypeScript
- 2 spaces for indentation
- 100 character line width
- Tailwind CSS class sorting enabled

### Husky

Husky manages Git hooks to run scripts before commits.

**Pre-commit Hook:** Runs `lint-staged` before each commit

### lint-staged

Runs linters and formatters only on staged files (files you're about to commit).

## Available Scripts

```bash
# Format all files
npm run format

# Check if files are formatted correctly (useful in CI)
npm run format:check

# Run ESLint
npm run lint

# Type check
npm run typecheck
```

## How It Works

1. **On Save (VS Code):** Files are automatically formatted when you save (if you have the Prettier extension)

2. **Before Commit:**
   - Husky pre-commit hook runs automatically
   - lint-staged formats and lints only the files you're committing
   - If there are issues, the commit is blocked until fixed

3. **Manual Formatting:**
   ```bash
   npm run format
   ```

## VS Code Setup

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. Settings are pre-configured in `.vscode/settings.json`

## Bypassing Hooks (Not Recommended)

If you absolutely need to commit without running hooks:

```bash
git commit --no-verify -m "your message"
```

**Note:** This should be avoided as it bypasses code quality checks.
