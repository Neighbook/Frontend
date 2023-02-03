export const fakeAuth = (email: string, password: string): Promise<string> =>
    new Promise((resolve) => {
        console.log(email);
        console.log(password);
        setTimeout(() => resolve('2342f2f1d131rf12'), 250);
    });