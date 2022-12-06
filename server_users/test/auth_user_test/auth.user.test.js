const request =require('./request');
/**
     * @Author Nguyễn Tiến Tài
     * @Created_at 12/05/2022
     * @Description Unit test Auth user Api
*/
describe("admin_user_api", () => {
    describe("Authentication - Login User ", () => {
        test('Success - Login User', async () => {
            const res = await request.login_User_Test("nguyentientai10@gmail.com","Taiheo123@")
            expect(res.status).toBe(200);
            expect(res.data).toEqual({
                status: expect.any(Number),
                success:expect.any(Boolean),
                msg: expect.any(Object),
            });
        });
        test('Error - User not found', async () => {
            const res = await request.login_User_Test("fdhhhdjd1","Taiheo123@")

                expect(res.response.status).toBe(400);
                expect(res.response.data).toEqual({
                    status: expect.any(Number),
                    success:expect.any(Boolean),
                    msg: expect.any(String),
                });
        });
        test('Error - Password is incorrect', async () => {
            const res = await request.login_User_Test("nguyentientai10@gmail.com","Taiheo123@111")

            expect(res.response.data).toEqual({
                status: expect.any(Number),
                success:expect.any(Boolean),
                msg: expect.any(String),
            });
        });

    })
});
