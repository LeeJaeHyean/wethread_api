const createUser = async (req, res) => {
    console.log("확인 한 번 해봤습니다~ ㅋ");
    try {
        let conn = await mysql.createConnection(connect);
        const sql = "INSERT INTO users (name, email, pw) VALUES (?, ?, ?)";
        const userInfo = {
            "name": req.body.name,
            "email": req.body.email,
            "pw": req.body.pw
        };
        await conn.execute(sql, [userInfo.name, userInfo.email, userInfo.pw]);
        conn.end();
        res.status(201).json({ message: "DataPool Created" });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: "ERROR CREATE!" });
    }
}

module.exports ={
    createUser
};