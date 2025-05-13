import React from 'react';
import { Container, Typography } from '@mui/material';
import Banner from '@/components/banner';
import VehicleServices from '@/components/vehicleServices';
import Banner2 from '@/components/banner2';
export default function HomePage() {
  return (
    <div>
       <Banner />
       <VehicleServices />
        <Banner2 />
    </div>
  );
}
