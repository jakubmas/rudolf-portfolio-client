import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';

const useViewStyles = makeStyles({
  root: {}
});

const useItemStyles = makeStyles((theme) => ({
  root: {
    '& > .MuiTreeItem-content > .MuiTreeItem-label': {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 0',
      background: 'transparent !important',
      pointerEvents: 'none'
    },
    '& > .MuiTreeItem-content  > .MuiTreeItem-label::before': {
      content: "''",
      display: 'inline-block',
      width: 12,
      height: 12,
      marginRight: 8,
      border: '1px solid #ccc',
      background: 'white'
    }
  },
  iconContainer: {
    marginRight: 12,
    '& > svg': {
      padding: 8,
      '&:hover': {
        opacity: 0.6
      }
    }
  },
  label: {
    padding: 0
  },
  selected: {
    '& > .MuiTreeItem-content  > .MuiTreeItem-label::before': {
      background: theme.palette.primary.main,
      border: '1px solid transparent'
    }
  }
}));

export const CheckboxTreeView: React.FC<{}> = () => {
  const classesView = useViewStyles();
  const classesItem = useItemStyles();

  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    console.log('handleToggle: ', { event, nodeIds });
    if (event.target.nodeName !== 'svg') {
      return;
    }
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    console.log('handleSelect: ', { event, nodeIds });
    if (event.target.nodeName === 'svg') {
      return;
    }
    const first = nodeIds[0];
    if (selected.includes(first)) {
      setSelected(selected.filter((id) => id !== first));
    } else {
      setSelected([first, ...selected]);
    }
  };

  return (
    <TreeView
      classes={classesView}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
      multiSelect
    >
      <TreeItem classes={classesItem} nodeId="1" label="Applications">
        <TreeItem classes={classesItem} nodeId="2" label="Calendar" />
        <TreeItem classes={classesItem} nodeId="3" label="Chrome" />
        <TreeItem classes={classesItem} nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem classes={classesItem} nodeId="5" label="Documents">
        <TreeItem classes={classesItem} nodeId="6" label="Material-UI">
          <TreeItem classes={classesItem} nodeId="7" label="src">
            <TreeItem classes={classesItem} nodeId="8" label="index.js" />
            <TreeItem classes={classesItem} nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};
