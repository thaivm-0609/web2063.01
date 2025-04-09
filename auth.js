//khai báo hàm đăng ký
async function register(event) {
    event.preventDefault();
    //B1: lấy dữ liệu ng dùng nhập vào form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //B2: validate dữ liệu
    if (!email || !password) { //nếu bỏ trống email hoặc password
        return alert('Vui lòng nhập đầy đủ dữ liệu')
    }
    if (password.length < 6) {
        return alert('Password không được ít hơn 6 ký tự');
    }
    //B3: gửi dữ liệu lên json-server-auth
    const data = {
        email,
        password,
    };
    try { //có 3 đường dẫn cho đăng ký: /register, /signup, /users
        await axios.post('http://localhost:3000/register', data);
        alert('Đăng ký thành công');
        location.href="/login.html";
    } catch (error) {
        console.error(error);
    }
}

//hàm đăng nhập
async function login(event) {
    event.preventDefault();
    //B1: lấy dữ liệu từ form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //B2: validate dữ liệu
    if (!email || !password) {
        return alert('Không được để trống dữ liệu')
    }
    if (password.length < 6) {
        return alert('Password không được ngắn hơn 6 ký tự')
    }
    //B3: gửi dữ liệu lên json-server
    const data = {
        email,
        password,
    };
    try {
        const res = await axios.post('http://localhost:3000/login', data);
        const token = res.data.accessToken; //lấy accessToken từ res mà json-server trả về
        localStorage.setItem('token', token); //lưu token vào trong localStorage
        alert('Đăng nhập thành công');
    } catch (error) {
        console.error(error)
    }
}