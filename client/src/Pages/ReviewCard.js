import { LinkedinFilled , GithubFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const ReviewCard = ({ user }) => {
  console.log(user.skills);
  return (
    <div className="reviewCard">
      <h4>{user.username}</h4>
      <div className="links">
        <Link to={user.linkedIn} style={{color:"#4169E1"}} className='icons'><LinkedinFilled /></Link>
        <Link to={user.github}   style={{color:"#583759"}} className='icons'><GithubFilled /></Link>
      </div>
      <div className="skills">
      <h5>Skills :</h5>
  {user.skills.length > 0 ? (
    <>
      <ul>
      {user.skills.map((skill,i) => (
        <li key={i}>{skill.technology}</li>
      ))}
      </ul>
    </>
  ) : (
    <p style={{textShadow:"1px 1px 1px black",fontSize:"1.5rem"}}>No skills listed.</p>
  )}
</div>
    </div>
  );
};

export default ReviewCard;
