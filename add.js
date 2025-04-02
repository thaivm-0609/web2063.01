const id = location.search.split("=")[1];

async function getDetail() {
    if (!id) return; //nếu không có id => đang dùng chức năng thêm mới

    try {
        const res = await axios.get(`http://localhost:3000/students/${id}`); //lấy dữ liệu đổ ra form
        const oldStudent = res.data;
        document.getElementById('maSv').value = oldStudent.maSv;
        document.getElementById('ten').value = oldStudent.ten;
        document.getElementById('namSinh').value = oldStudent.namSinh;
        document.getElementById('gioiTinh').value = oldStudent.gioiTinh;
        document.getElementById('anh').value = oldStudent.anh;
    } catch (error) {
        console.error(error);
    }
}

getDetail(); //gọi hàm để đổ dữ liệu nếu là chức năng edit

//khai báo hàm handleSubmit để thực thi khi ng dùng bấm nút Submit trong form
async function handleSubmit(event) {
    event.preventDefault(); //ngăn không reload lại trang

    //lấy dữ liệu người dùng nhập vào form: document.getElementById('id').value
    const maSv = document.getElementById('maSv').value;
    const ten = document.getElementById('ten').value;
    const namSinh = document.getElementById('namSinh').value;
    const gioiTinh = document.getElementById('gioiTinh').value;
    const anh = document.getElementById('anh').value;

    //gửi dữ liệu len json-server để lưu lại
    try {
        const data = {
            maSv,
            ten,
            namSinh: Number(namSinh),
            gioiTinh,
            anh
        };

        if (!id) { //nếu không có id => chức năng thêm mới
            //truyền data lên để lưu vào json-server
            await axios.post("http://localhost:3000/students", data);
            alert('Thêm mới thành công');
        } else { //có id => chức năng chỉnh sửa
            await axios.put(`http://localhost:3000/students/${id}`, data);
            alert('Chỉnh sửa thành công');
        }
        
        location.href = "/"; //điều hướng ng dùng về trang danh sách
    } catch (error) {
        console.error(error);
    }

}