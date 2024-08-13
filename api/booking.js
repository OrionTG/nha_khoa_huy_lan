export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { name, phoneNumber, age, dob, appointmentDate } = req.body;
  
      // Here you can add your logic to process the data,
      // like saving it to a database or sending an email.
  
      // For this example, we'll just log the data and return a success response.
      console.log('Booking received:', { name, phoneNumber, age, dob, appointmentDate });
  
      // Assuming the processing is successful, send a success response
      res.status(200).json({ message: 'Booking successful!' });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  