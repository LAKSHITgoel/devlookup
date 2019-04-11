import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div
        className="card testimonial-card"
        style={{ height: "430px", maxWidth: "360px" }}
      >
        <div className="card-up aqua-gradient" />
        <div className="avatar mx-auto white" style={{ maxHeight: 120 }}>
          <div className="avatar-bg">
            <img
              src={profile.user.avatar}
              className="rounded-circle"
              alt="avatar"
            />
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title">{profile.user.name}</h4>
          <p className="text-muted" style={{ fontSize: 12, margin: 0 }}>
            {profile.status}{" "}
            {isEmpty(profile.company) ? (
              <span> </span>
            ) : (
              <span>@{profile.company}</span>
            )}
          </p>
          <p className="text-muted" style={{ fontSize: 12 }}>
            {isEmpty(profile.location) ? (
              <span> </span>
            ) : (
              <span>{profile.location}</span>
            )}
          </p>
          <ul className="skills-list">
            {profile.skills.map((skill, index) => (
              <li key={index} className="skill-item">
                <i className="fa fa-check pr-1" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
          <p>
            {isEmpty(profile.website) ? (
              <span className="px-2 fa-lg pi-ic"> </span>
            ) : (
              <a
                className="px-2 fa-lg pi-ic"
                href={profile.website}
                target="_blank"
              >
                <i className="fas fa-globe" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.twitter) ? (
              <span className="px-2 fa-lg tw-ic"> </span>
            ) : (
              <a
                className="px-2 fa-lg tw-ic"
                href={profile.social.twitter}
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.facebook) ? (
              <span className="px-2 fa-lg fb-ic"> </span>
            ) : (
              <a
                className="px-2 fa-lg fb-ic"
                href={profile.social.facebook}
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.linkedin) ? (
              <span className="px-2 fa-lg li-ic"> </span>
            ) : (
              <a
                className="px-2 fa-lg li-ic"
                href={profile.social.linkedin}
                target="_blank"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.youtube) ? (
              <span className="px-2 fa-lg yt-ic"> </span>
            ) : (
              <a
                className="px-2 fa-lg yt-ic"
                href={profile.social.youtube}
                target="_blank"
              >
                <i className="fab fa-youtube" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.instagram) ? (
              <span className="px-2 fa-lg pink-text"> </span>
            ) : (
              <a
                className="px-2 fa-lg pink-text"
                href={profile.social.instagram}
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
            )}
            {isEmpty(profile.githubusername && profile.githubusername) ? (
              <span className="px-2 fa-lg black-text"> </span>
            ) : (
              <a
                className="px-2 fa-lg black-text"
                href={"https://github.com/" + profile.githubusername}
                target="_blank"
              >
                <i className="fab fa-github" />
              </a>
            )}
          </p>
          <Link
            to={`/profile/${profile.handle}`}
            className="badge badge-pill badge-info"
          >
            View Profile
          </Link>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
