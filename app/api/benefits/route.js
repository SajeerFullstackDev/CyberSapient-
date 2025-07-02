export async function GET() {
  const benefits = [
    {
      id: 1,
      title: "10% Off Fuel",
      description: "Valid at selected stations",
      cta: "Claim",
    },
    {
      id: 2,
      title: "Free Car Wash",
      description: "One free every month",
      cta: "View",
    },
    {
      id: 3,
      title: "Discount on Service",
      description: "15% off on periodic servicing",
      cta: "Avail Now",
    },
    {
      id: 4,
      title: "Priority Support",
      description: "Get quick access to our helpdesk",
      cta: "Get Support",
    },
  ];

  return Response.json(benefits);
}
