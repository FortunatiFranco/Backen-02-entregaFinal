export async function login(req, res) {
    res.render("login");
}

export async function register(req, res) {
    res.render("register");
}

export async function errorRegister(req, res) {
    res.send("El registro fallo.")
}

export async function profile(req, res) {
    res.render("profile", {
        user: req.user || req.session.user
    })
}