import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';


export const Panel = ({ children, className, frosted, ...rest }) => {
  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);

  const finalClassNames = classNames(
    `panel ${uiMode === 'dark' ? 'panel-dark' : ''}`,
    {
      'panel-frosted': frosted
    },
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}


