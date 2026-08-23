import { UserCardProps } from "../../interfaces/components/user-card.interface";

import "./UserCard.scss";

export function UserCard({ user }: UserCardProps) {
  const visibleHobbies = user.hobbies.slice(0, 2);
  const remainingHobbiesCount = user.hobbies.length - visibleHobbies.length;

  return (
    <article className="user-card">
      <img
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
        className="user-card-avatar"
        loading="lazy"
      />

      <div className="user-card-info">
        <h3 className="user-card-name">{`${user.firstName} ${user.lastName}`}</h3>
        <span className="user-card-nationality"> {user.nationality}</span>
        <div className="user-card-hobbies">
          {visibleHobbies.map((hobby) => (
            <span key={hobby} className="user-card-hobby">
              {hobby}
            </span>
          ))}
          {remainingHobbiesCount > 0 && (
            <span className="user-card-hobby user-card-hobby-more">
              +{remainingHobbiesCount}
            </span>
          )}
        </div>
      </div>
      <div className="user-card-age">
        <span>Age:</span>
        <strong>{user.age}</strong>
      </div>
    </article>
  );
}
