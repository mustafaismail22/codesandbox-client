import React from 'react';
import history from 'app/utils/history';
import { inject, observer } from 'mobx-react';
import Input from 'common/components/Input';

import TimeIcon from 'react-icons/lib/md/access-time';

import Item from './Item';
import SandboxesItem from './SandboxesItem';
import TrashItem from './TrashItem';
import { Items, CategoryHeader } from './elements';

class Sidebar extends React.Component {
  shouldComponentUpdate() {
    // Without this the app won't update on route changes, we've tried using
    // `withRouter`, but it caused the app to remount on every route change.
    return true;
  }

  handleSearchFocus = () => {
    history.push('/dashboard/search');
  };

  handleSearchChange = e => {
    this.props.signals.dashboard.searchChanged({ search: e.target.value });
  };

  render() {
    const { store } = this.props;

    return (
      <div style={{ width: 275, overflowY: 'auto' }}>
        <div style={{ margin: '0 1rem' }}>
          <Input
            onFocus={this.handleSearchFocus}
            block
            value={store.dashboard.filters.search}
            onChange={this.handleSearchChange}
            placeholder="Filter Sandboxes"
          />
        </div>

        <Items>
          <CategoryHeader>
            {store.user
              ? `${store.user.username}${
                  store.user.username.endsWith('s') ? "'" : "'s"
                } Sandboxes`
              : 'My Sandboxes'}
          </CategoryHeader>
          <Item Icon={TimeIcon} path="/dashboard/recents" name="Recent" />
          <SandboxesItem />
          <TrashItem />
        </Items>

        <Items>
          <CategoryHeader>Koekjes Team</CategoryHeader>
          <Item Icon={TimeIcon} path="/dashboard/recents" name="Recent" />
          <SandboxesItem />
          <TrashItem />
        </Items>
      </div>
    );
  }
}

export default inject('signals', 'store')(observer(Sidebar));