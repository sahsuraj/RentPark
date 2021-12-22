import React, { Component } from "react";

import ContentLoader from "react-content-loader";

class Loader extends Component {
  state = {};
  categoryLoader() {
    return (
      <div className="category">
        <ContentLoader>
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
        <ContentLoader>
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
        <ContentLoader>
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
        <ContentLoader>
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
      </div>
    );
  }

  bannerLoader() {
    return (
      <ContentLoader>
        <rect x="0" y="4" rx="5" ry="5" width="404" height="404" />
      </ContentLoader>
    );
  }

  propertyLoader() {
    return (
      <div className="category">
        <ContentLoader>
          <rect x="2" y="1" rx="5" ry="5" width="244" height="244" />
          <rect x="4" y="254" rx="4" ry="4" width="159" height="13" />
          <rect x="5" y="278" rx="4" ry="4" width="245" height="13" />
        </ContentLoader>
        <ContentLoader>
          <rect x="2" y="1" rx="5" ry="5" width="244" height="244" />
          <rect x="4" y="254" rx="4" ry="4" width="159" height="13" />
          <rect x="5" y="278" rx="4" ry="4" width="245" height="13" />
        </ContentLoader>
        <ContentLoader>
          <rect x="2" y="1" rx="5" ry="5" width="244" height="244" />
          <rect x="4" y="254" rx="4" ry="4" width="159" height="13" />
          <rect x="5" y="278" rx="4" ry="4" width="245" height="13" />
        </ContentLoader>
        <ContentLoader>
          <rect x="2" y="1" rx="5" ry="5" width="244" height="244" />
          <rect x="4" y="254" rx="4" ry="4" width="159" height="13" />
          <rect x="5" y="278" rx="4" ry="4" width="245" height="13" />
        </ContentLoader>
      </div>
    );
  }
}

export default Loader;
