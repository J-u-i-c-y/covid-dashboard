import React from 'react';
import PropTypes from 'prop-types';

const ModuleNavMenuItem = ({
  el,
  id,
  groupId,
  nuvCurrentItems,
  toggleCurrentMenuItem,
}) => {
  const handlerClickButton = () => {
    toggleCurrentMenuItem(id, groupId);
  };
  const menuItem = (
    <li
      className={`module-nav__menu-item ${
        id === nuvCurrentItems[groupId] ? 'is-current' : ''
      }`}
      key={`${id}-${groupId}`.toString()}
    >
      <button type="button" onClick={handlerClickButton}>
        {el}
      </button>
    </li>
  );
  const separatorItem = (
    <li
      className={('module-nav__menu-item', 'module-nav__menu-item--separator')}
      key={`${id}-${groupId}`.toString()}
    />
  );
  return el === 'separator' ? separatorItem : menuItem;
};

ModuleNavMenuItem.propTypes = {
  toggleCurrentMenuItem: PropTypes.func.isRequired,
  el: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  groupId: PropTypes.number.isRequired,
  nuvCurrentItems: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ModuleNavMenuItem;
