import react from "react";
import { Table } from "react-bootstrap";

function ShowUser(props) {
  console.log(props.details);
  console.log("HELOO");

  function handleClick(event) {
    console.log(event.target.name);
    // console.log(event.target.value);
    // console.log(event.target.innerText);
    props.delete(event.target.value, event.target.innerText,event.target.name);
  }
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>_id</th>
          <th>Username</th>
          <th>Mobile Number</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
     

      {props.details.map((user) => {
        console.log(user);
        const { _id, username, email, address, mobileNum } = user;
        return (
          <tbody>
            <tr>
              <td>{_id}</td>
              <td>
                <button
                  type="hidden"
                  value={_id}
                  name="username"
                  onClick={handleClick}
                >
                  {username}
                  {/* <input type="hidden" id="_id" name="userId" value={_id} /> */}
                </button>
              </td>
              <td>
                <button
                  type="hidden"
                  value={_id}
                  name="mobileNum"
                  onClick={handleClick}
                >
                  {mobileNum}
                </button>
              </td>
              <td>
                <button
                  type="hidden"
                  value={_id}
                  name="email"
                  onClick={handleClick}
                >
                  {email}
                </button>
              </td>
              <td>
                <button
                  type="hidden"
                  value={_id}
                  name="address"
                  onClick={handleClick}>
                  {address}
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
}

export default ShowUser;
