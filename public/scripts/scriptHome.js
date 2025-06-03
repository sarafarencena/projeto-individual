function openModal(roomId, timeSlot, isBooked, bookedByUser) {
  const modal = document.getElementById("bookingModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const roomSpan = document.getElementById("selectedRoom");
  const timeSpan = document.getElementById("selectedTime");

  roomSpan.textContent = roomId;
  timeSpan.textContent = timeSlot;

  if (isBooked && bookedByUser) {
    modalTitle.textContent = "Gerenciar Reserva";
    modalContent.innerHTML = `
                <p>Você já possui uma reserva para esta sala neste horário.</p>
                <button type="button" onclick="editbooking('${roomId}', '${timeSlot}')">Editar Reserva
                </button>
                <button type="button" onclick="cancelbooking('${roomId}', '${timeSlot}')">Cancelar Reserva</button>
            `;
  } else if (isBooked) {
    modalTitle.textContent = "Sala Ocupada";
    modalContent.innerHTML =
      "<p>Esta sala já está reservada para este horário.</p>";
  } else {
    modalTitle.textContent = "Confirmar Reserva";
    modalContent.innerHTML = `
                <p>Deseja confirmar a reserva desta sala?</p>
                <button type="button" onclick="confirmbooking('${roomId}', '${timeSlot}')">Confirmar Reserva</button>
            `;
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("bookingModal").style.display = "none";
}

function confirmbooking(roomId, timeSlot) {
  console.log(`Reservando sala ${roomId} no horário ${timeSlot}`);
  // Aqui você implementará a lógica de reserva
  closeModal();
}

function editbooking(roomId, timeSlot) {
  console.log(`Editando reserva da sala ${roomId} no horário ${timeSlot}`);
  // Aqui você implementará a lógica de edição
  closeModal();
}

function cancelbooking(roomId, timeSlot) {
  console.log(`Cancelando reserva da sala ${roomId} no horário ${timeSlot}`);
  // Aqui você implementará a lógica de cancelamento
  closeModal();
}

// Closing the modal by clicking out of it
window.onclick = function (event) {
  const modal = document.getElementById("bookingModal");
  if (event.target === modal) {
    closeModal();
  }
};
