import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import GlobalFooter from 'components/GlobalFooter';
import styles from './UserLayout.less';
import { getRoutes } from '../utils/utils';

import imgs from '../common/imgs';
import config from '../common/config';

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = config.basicTitle;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={imgs['logo']} />
                  <span className={styles.title}>{config.appName}</span>
                </Link>
              </div>
              <div className={styles.desc}>{config.basicTitle}</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter
            copyright={config.copyright}
            links={config.globalFooterLinks}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
