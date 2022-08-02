# Solution notes

From the [problem statement](https://powerxai.notion.site/Software-Engineer-React-464084a563f74b2594884f375627308a) I extracted these requirements:

- [x] log in (cloned mockApi)
- [x] persist note
- [x] bearer
- [x] loaders -- buttons are disabled and user gets feedback about states
- [x] save user name in local storage for simple session management
- [ ] extract API to env var
- [ ] extract ui components — button, input, textarea
  - possibly add storybook
- [ ] make styling consistent:
  - input padding
  - button padding
  - focus states —> use box shadow a la chakra but with focus-visible
- [ ] add tests
- [ ] add a proper back end and authentication

Additional tasks:

- [x] audit fix. `npm audit` highlighted a number of issues. `npx yarn-audit-fix` didn't resolve all so I did a `yarn upgrade` which resolved most
- [x] code cleanup

You can see above which task were completed and which would have been done given more time. Comments are inline in the code where needed.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint or type errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
