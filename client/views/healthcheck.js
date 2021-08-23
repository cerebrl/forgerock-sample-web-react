import React, { useEffect, useState } from 'react';
import apiRequest from '../utilities/request';

function HealthCheck() {
  const [res, setRes] = useState('Checking health...');
  useEffect(() => {
    async function checkHealth() {
      try {
        const result = await apiRequest('health-check', 'GET');
        console.log(result);
        if (result.ok) {
          setRes('Health check: Good!');
        } else {
          setRes(result.error);
        }
      } catch (err) {
        if (err.message) {
          setRes(err.message);
        } else {
          setRes('Error checking health');
        }
      }
    }
    checkHealth();
  }, []);
  return <div>{res}</div>;
}

export default HealthCheck;
