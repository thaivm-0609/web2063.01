//Lấy danh sách SV từ json-server
async function getList() {
    try {
        //code logic
        const response = await axios.get("http://localhost:3000/students"); //B1: call api để lấy dữ liệu
        const students = response.data; //B2: gán response.data vào biến students
        const contentHtml = students.map(renderData).join("");//B3: chạy vòng lặp vs biến students, mỗi phần tử sẽ gọi hàm renderData để tạo thành 1 dòng
        document.getElementById('list').innerHTML = contentHtml; //thêm contentHtml vào trong thẻ tbody
    } catch (error) { //nếu code trong try lỗi => chạy xuống catch
        console.error(error);
    }
}
function renderData(student) { //thêm thẻ tr/td với từng student
    return `
        <tr> 
            <td>${student.id}</td>
            <td>${student.maSv}</td>
            <td>${student.ten}</td>
            <td>${student.namSinh}</td>
            <td>${student.gioiTinh}</td>
            <td><img src="${student.anh}"/></td>
            <td> 
                <button class="btn btn-warning"><a href="/add.html?id=${student.id}">Edit</a></button>
                <button onClick=delStudent(${student.id}) class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `
}
getList(); //gọi hàm/thực thi getList
//Xóa sinh viên
async function delStudent(id) {
    try {
        if (confirm('Bạn có chắc không?')) { //popup confirm, nếu ng dùng đồng ý => confirm trả về true
            const res = await axios.delete(`http://localhost:3000/students/${id}`);
            alert('Xóa thành công');
        }
    } catch (error) {
        console.error(error);
    }
}