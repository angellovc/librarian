import Swal from "sweetalert2";

interface QuestionParameters {
    title: string;
    text: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const question = ({title, text, onCancel, onConfirm}:QuestionParameters) => {
    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#009688',
        confirmButtonColor: '#d32f2f',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            onConfirm && onConfirm();
        } else {
            onCancel && onCancel();
        }
      })
}

export {
    question
}