import { Button,} from "@chakra-ui/react";

export default function DeleteDialog({ isOpen, onCancel, onConfirm }: {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
      <div className="modal">
        <h2>Удаление заметки</h2>
        <p>Вы действительно хотите удалить эту заметку?</p>
        <div className="buttons">
          <Button className="cancel" onClick={onCancel}>Отмена</Button>
          <Button className="delete" onClick={onConfirm}>Удалить</Button>
        </div>
      </div>
    </div>
    );
}

