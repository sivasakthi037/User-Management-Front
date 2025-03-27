import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <div className="content">
        <div className="name">{name}</div>
        <div>{email}</div>
      </div>
      <div>
        <Link to={`/edit/${id}`}>
          <span className="edit" style={{ color: "blue", marginRight: "10px", cursor: "pointer" }}>Edit</span>
        </Link>
        <span
          className="delete"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => props.clickHander(id)}
        >Delete</span>
      </div>
    </div>
  );
};

export default ContactCard;