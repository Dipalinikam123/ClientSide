import React, { useEffect } from 'react'

export default function Profile({ getUserProfile, userProfile }) {
  useEffect(() => {
    getUserProfile()
  }, []);

  console.log('------userProfile', userProfile)


  return (
    <div className="container mt-5 ">
        {/* Profile Details */}
        <div className="col-md-4 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>Profile Details</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Name:</strong>
                </div>
                <div className="col-sm-9">{userProfile?.user?.firstName} {userProfile?.user?.lastName}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Email:</strong>
                </div>
                <div className="col-sm-9">{userProfile?.user?.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Gender:</strong>
                </div>
                <div className="col-sm-9">{userProfile?.user?.gender}</div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Address:</strong>
                </div>
                <div className="col-sm-9">1234 Elm St, San Francisco, CA</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>About Me:</strong>
                </div>
                <div className="col-sm-9">
                  A passionate developer with experience in creating dynamic and user-friendly web applications.
                </div>
              </div> */}
            </div>
          </div>
        </div>
      
    </div>
  );
};


