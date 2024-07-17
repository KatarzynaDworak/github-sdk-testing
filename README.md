# Thanks for viewing my Project ✨

<Będzie tu nagranie projektu>


<br />

## :star: **Implementation:**
The project uses **Webpack and npm**. To run the app on your machine you should install all dependencies. Then create a localhost port and run your web explorer.

Let's start with installing all dependencies. Move to the app main workspace and run:

        npm i
        
The project also requires **a secret token** that is not available on GitHub. If you want to test the project, contact me on *k.dw@poczta.onet.pl* and I'll be happy to provide you with the token ;) Then you should create a file named `secretToken` and paste the token you received from me there. This token will allow you to execute the functions and pass the tests successfully. 
        
At the end you should write down in the terminal:

        npm test
        
to start tests.

<br />

## Main goal of my work was to:
**1. Develop a JavaScript SDK to interact with the GitHub API:**

- Fetch repository data for a given user.
- Retrieve detailed user information.
- Send, check, and delete repository invitations.

**2. Implement robust testing:**

- Write comprehensive tests for all implemented functions.
- Ensure all functionalities work as expected with real GitHub data.

**3. Provide a clean and modular code structure:**
- Maintain a clear separation of concerns.
- Use modern JavaScript practices for readability and maintainability.

**4. Handle API interactions efficiently:**

- Manage API tokens securely.
- Handle different response statuses and errors gracefully.

**5. Document and showcase the SDK:**

- Provide usage examples.
- Ensure easy integration for other developers.
<br />

## Solutions provided in the project
**1. Fetching Repositories**
The getRepositories method fetches all repositories for a given user from the GitHub API:

        async getRepositories(user, token) {
            const url = `https://api.github.com/users/${user}/repos`;
            const headers = setHeaders(token);
        
            return await (await fetch(url, { headers: headers })).json();
        }
        **Usage:**

        const gh = new GithubSDK();
        const repositories = await gh.getRepositories('KatarzynaDworak', token);
        console.log(repositories);

**2. Fetching User Information**
The getUserInfo method retrieves detailed information about a user:

        async getUserInfo(user, token) {
            const url = `https://api.github.com/users/${user}`;
            const headers = setHeaders(token);
        
            return await (await fetch(url, { headers: headers })).json();
        }
        **Usage:**
        
        const userInfo = await gh.getUserInfo('KatarzynaDworak', token);
        console.log(userInfo);
**3. Sending an Invitation**
The sendInvitation method sends an invitation to another user to collaborate on a repository:

        async sendInvitation(user, repoName, inviteeUser, token) {
            const url = `https://api.github.com/repos/${user}/${repoName}/collaborators/${inviteeUser}`;
            const headers = setHeaders(token);
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers
            });
            if (response.ok) {
                return { success: true, message: `Invitation sent to ${inviteeUser} for repository ${repoName}` };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message };
            }
        }
        **Usage:**

        const invitationResult = await gh.sendInvitation('KatarzynaDworak', 'calculator', 'bogolubow', token);
        console.log(invitationResult);

**4. Checking Invitation Status**
The checkInvitationStatus method checks the status of an invitation:

        async checkInvitationStatus(user, repoName, inviteeUser, token) {
            const url = `https://api.github.com/repos/${user}/${repoName}/collaborators/${inviteeUser}`;
            const headers = setHeaders(token);
            const response = await fetch(url, {
                method: 'PUT',
                headers: headers
            });
            if (response.ok) {
                return { success: true, status: response.status, message: `Invitation sent to ${inviteeUser} for repository ${repoName} has status 201` };
            } else {
                const errorData = await response.json();
                return { success: false, status: response.status, message: errorData.message };
            }
        }
        **Usage:**
        
        javascript
        Skopiuj kod
        const statusResult = await gh.checkInvitationStatus('KatarzynaDworak', 'calculator', 'bogolubow', token);
        console.log(statusResult);
        
**5. Deleting an Invitation**
The deleteInvitation method deletes an invitation for a user from a repository:

        async deleteInvitation(user, repoName, inviteeUser, token) {
            const url = `https://api.github.com/repos/${user}/${repoName}/collaborators/${inviteeUser}`;
            const headers = setHeaders(token);
            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers
            });
            if (response.ok) {
                return { success: true, message: `Invitation deleted for ${inviteeUser} from repository ${repoName}` };
            } else {
                const errorData = await response.json();
                return { success: false, message: errorData.message };
            }
        }
        **Usage:**

        const deleteResult = await gh.deleteInvitation('KatarzynaDworak', 'calculator', 'bogolubow', token);
        console.log(deleteResult);
<br />
<br />

## 🛠️ Languages and Tools used: 
JavaScript, Node.js, API, Fetch, Git, GitHub, Terminal, Visual Studio Code, Npm

<br />

## :blue_heart:  You can find me on: 
<br />

[<img align="left" alt="Katarzyna Dworak LinkedIn" width="40px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />](https://www.linkedin.com/in/katarzynadworakk/)

<br /> 
<br />

### Thanks
To my Mentor - [devmentor.pl](https://devmentor.pl/) – for creating the task and for the code review.

If you have any questions feel free to get in touch with me (contact in the [profile readme](https://github.com/katarzynadworak)).
