export class GithubSDK {
    async getRepositories(user, token) {
        const url = `https://api.github.com/users/${user}/repos`;
        const headers = setHeaders(token);  

        return await (await fetch(url, {
            headers: headers
        })).json();
    }
    //pobieranie informacji o samym uzytkowniku
    async getUserInfo(user, token) {
        const url = ` https://api.github.com/users/${user}`;
        const headers = setHeaders(token);

        return await (await fetch(url, {
            headers: headers
        })).json();
    }

    //wysłanie zaproszenia dla innego uzytkownika do repozytorium
    async sendInvitation(user, repoName, inviteeUser, token) {         
        const url = `https://api.github.com/repos/${user}/${repoName}/collaborators/${inviteeUser}`; 
        const headers = setHeaders(token);              
        const response = await fetch(url, {             
            method: 'PUT',             
            headers: headers         
        });                  
        if (response.ok) {             
            return { 
                success: true, 
                message: `Invitation sent to ${inviteeUser} for repository ${repoName}` 
            };         
        } else {             
            const errorData = await response.json();             
            return { success: false, message: errorData.message };         
        }     
    } 

    async checkInvitationStatus(user, repoName, inviteeUser, token) {         
        const url = `https://api.github.com/repos/${user}/${repoName}/collaborators/${inviteeUser}`; 
        const headers = setHeaders(token);              
        const response = await fetch(url, {             
            method: 'PUT',             
            headers: headers         
        });                  
        if (response.ok) {             
            return { 
                success: true, 
                status: response.status,
                message: `Invitation sent to ${inviteeUser} for repository ${repoName} has status 201` 
            };         
        } else {             
            const errorData = await response.json();             
            return { 
                success: false, 
                status: response.status,
                message: errorData.message };         
        }     
    } 

    //usuwanie zaproszenia dla użytkownika
    async deleteInvitation(user, repoName, inviteeUser, token) {         
        const url = `https://api.github.com/repos/${user}/${repoName}/collaborators/${inviteeUser}`;
        const headers = setHeaders(token);                   
        const response = await fetch(url, {             
            method: 'DELETE',             
            headers: headers   
        });                  
        if (response.ok) {             
            return {                 
                success: true,                 
                message: `Invitation deleted for ${inviteeUser} from repository ${repoName}`             
            };         
        } else {             
            const errorData = await response.json();             
            return {                 
                success: false,                 
                message: errorData.message             
            };         
        }     
    } 

}  

function setHeaders(token) {     
    return {         
        accept: 'application/vnd.github+json',         
        'X-GitHub-Api-Version': '2022-11-28',         
        Authorization: `token ${token}`     
    }; 
}