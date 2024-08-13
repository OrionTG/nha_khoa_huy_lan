'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

export default function FormBooking() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState(false);
  const [dob, setDob] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(''); // State for Appointment Date
  const [backdrop, setBackdrop] = React.useState('opaque');

  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError(!isValidPhoneNumber(e.target.value));
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$|^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleAgeChange = (e) => {
    const ageValue = parseInt(e.target.value, 10);
    setAge(ageValue);
    setAgeError(isNaN(ageValue) || ageValue < 3 || ageValue > 100);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleAppointmentDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (phoneNumberError || ageError) return;

    const bookingData = {
      name,
      phoneNumber,
      age,
      dob,
      appointmentDate
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Booking success:', result);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">Đặt lịch</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" backdrop={backdrop}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Booking</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Tên (Name)"
                  placeholder="Nhập tên của bạn (Enter your name)"
                  variant="bordered"
                  value={name}
                  onChange={handleNameChange}
                />
                <Input
                  type="number"
                  label="Số điện thoại (Phone number)"
                  placeholder="Nhập số điện thoại của bạn (Enter your phone number)"
                  variant="bordered"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  isInvalid={phoneNumberError}
                  errorMessage="Sai định dạng số điện thoại, vui lòng kiểm tra lại! (Invalid phone number format!)"
                />
                <Input
                  label="Tuổi (Age)"
                  placeholder="Nhập độ tuổi của bạn (Enter your age)"
                  type="number"
                  variant="bordered"
                  value={age}
                  onChange={handleAgeChange}
                  isInvalid={ageError}
                  errorMessage="Độ tuổi không hợp lệ! (Invalid age)"
                />
                <Input
                  label="Ngày sinh (Date of Birth)"
                  placeholder="Chọn ngày sinh của bạn (Select your date of birth)"
                  type="date"
                  variant="bordered"
                  value={dob}
                  onChange={handleDobChange}
                />
                <Input
                  label="Ngày hẹn (Date of Appointment)"
                  placeholder="Chọn ngày hẹn của bạn (Select your appointment date)"
                  type="date"
                  variant="bordered"
                  value={appointmentDate}
                  onChange={handleAppointmentDateChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Hủy (Cancel)
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Đặt lịch ngay! (Book now!)
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
