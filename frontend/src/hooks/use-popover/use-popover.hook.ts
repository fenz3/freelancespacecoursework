import { useCallback, useState } from 'react';

type Properties = {
  isOpened: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const usePopover = (): Properties => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handlePopoverOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return {
    isOpened,
    onClose: handlePopoverClose,
    onOpen: handlePopoverOpen,
  };
};

export { usePopover };
