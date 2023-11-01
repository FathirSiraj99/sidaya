import Swal from "sweetalert2";

export function deleted() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Data Deleted Successfully',
        background: '#A5DC86',
        iconColor: '#FFFFFF'
      })
}

export function checkActivityTime() {
  Swal.fire({
    title: "Belum memasuki waktu Aktivitas!",
    text: "Tidak bisa melihat aktivitas yang dipilih",
    icon: "warning",
    confirmButtonText: "OK",
  });
}