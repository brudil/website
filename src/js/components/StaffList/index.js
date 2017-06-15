import React from 'react';
import Peekable from '../Peekable';
import Image from '../Image';
/* eslint-disable react/no-danger */
function StaffList({ value: { heading, body } }) {
  return (
    <div>
      <h2 className="Heading Heading--highlight">{heading}</h2>
      <ul className="StaffList">
        {body.map(member => (
          <li className="StaffList__item">
            <div className="u-responsive-ratio u-responsive-ratio--square">
              {member.photo
                ? <Image
                    className="StaffList__image ResponsiveImage"
                    src={member.photo.resource}
                    alt=""
                  />
                : null}
            </div>
            <span className="StaffList__title">{member.name}</span>
            <span className="StaffList__secondary">{member.jobTitle}</span>
            <div className="StaffList__content">
              <Peekable expandText="Read More">
                <div
                  className="Prose"
                  style={{ fontSize: '0.9rem' }}
                  dangerouslySetInnerHTML={{ __html: member.jobDescription }}
                />
              </Peekable>
              <ul className="StaffList__contact">
                {member.email
                  ? <li>
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </li>
                  : null}
                {member.officePhoneNumber
                  ? <li>{member.officePhoneNumber}</li>
                  : null}
                {member.mobilePhoneNumber
                  ? <li>{member.mobilePhoneNumber}</li>
                  : null}
                {member.officeLocation
                  ? <li>{member.officeLocation}</li>
                  : null}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
/* eslint-enable react/no-danger */

export default StaffList;
