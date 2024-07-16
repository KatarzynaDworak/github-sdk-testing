const fs = require('fs');


import { GithubSDK } from "./GithubSDK";

describe('GithubSDK', () => {

    const user = 'KatarzynaDworak';
    //testowanie informacji o repozytorium
    const token = fs.readFileSync("./secretFile");
    
    it('fetches array of repositories', async () => {
        const gh = new GithubSDK();

        const repositories = await gh.getRepositories(user, token);

        expect(Array.isArray(repositories)).toBe(true);
    });

    test('fetches repository js-advanced-calculator', async () => {
        const gh = new GithubSDK();

        const repositoryNames = (await gh.getRepositories(user, token)).map(repository => repository.name ? true : false);

        expect(repositoryNames).not.toContain(false);
    });
    
    test('fetches repository practice-html-and-css-basics', async () => {
        const gh = new GithubSDK();

        const repositoryNames = (await gh.getRepositories(user, token));

        expect(repositoryNames).not.toBeNull();
    });

    // testowanie informacji o użytkowniku
    test('fetches avatar_url', async () => {
        const gh = new GithubSDK();

        const userName = (await gh.getUserInfo(user, token));

        expect(userName.avatar_url).not.toBeNull();
    });

    test('fetches user login Bogolubow', async () => {
        const gh = new GithubSDK();

        const userName = (await gh.getUserInfo('Bogolubow', token));

        expect(userName.login).toContain('bogolubow');
    });

    test('fetches user login', async () => {
        const gh = new GithubSDK();

        const userName = (await gh.getUserInfo(user, token));

        expect(userName.login).toContain(user);
    });

    // testowanie wysyłania i usuwania zaproszenia do innego użytkownika do repozytorium
    test('fetches sending and deleting invitation for other user', async () => {
        const gh = new GithubSDK();
        
        const invitationResult = await gh.sendInvitation('KatarzynaDworak', 'js-advanced-calculator', 'bogolubow', token); 
        
        console.log(invitationResult); 
        expect(invitationResult.success).toBe(true);

        const deleteResult = await gh.deleteInvitation('KatarzynaDworak', 'js-advanced-calculator', 'bogolubow', token); 
        
        console.log(deleteResult); 
        expect(deleteResult.success).toBe(true);
    });

    test('fetches status of sending invitation for other user', async () => {
        const gh = new GithubSDK();
        
        const statusResult = await gh.checkInvitationStatus('KatarzynaDworak', 'js-advanced-calculator', 'bogolubow', token); 
        
        console.log(statusResult); 
        expect(statusResult.status).toBe(201);

        //usuwamy zaproszenie
        const deleteResult = await gh.deleteInvitation('KatarzynaDworak', 'js-advanced-calculator', 'bogolubow', token); 
        
        console.log(deleteResult); 
        expect(deleteResult.success).toBe(true);
        
    });
    
    
    test('fetches status 404 of sending invitation for other user', async () => {
        const gh = new GithubSDK();
        
        const statusResult = await gh.checkInvitationStatus('KatarzynaDworak', 'calculator987987', 'bogolubow', token); 
        
        console.log(statusResult); 
        expect(statusResult.status).toBe(404);
        
    });
    
});
