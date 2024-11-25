import { Menu, MenuItem } from '~/components/components';
import { usePopover } from '~/hooks/hooks';

type Properties = {
  onDelete: () => void;
  onEdit: () => void;
};

const ServiceMenu = ({ onDelete, onEdit }: Properties): JSX.Element => {
  const { isOpened, onClose, onOpen } = usePopover();

  const handleEditClick = () => {
    onEdit();
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <Menu isOpened={isOpened} onClose={onClose} onOpen={onOpen}>
        <MenuItem iconName="pencil" label="Edit" onClick={handleEditClick} />
        <MenuItem
          iconName="trashBin"
          label="Delete"
          onClick={handleDeleteClick}
          variant="danger"
        />
      </Menu>
    </>
  );
};

export { ServiceMenu };
