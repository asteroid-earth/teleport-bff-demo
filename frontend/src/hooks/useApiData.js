import { useState, useEffect } from 'react';

export const useApiData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data from: ${url}`);
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                "X-Custom-Header": "value",
            },
        
        });
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response body:', response.body);
    
       const text = await response.text();
        setRawResponse(text);
        console.log('Raw response:', text);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        try {
          const jsonData = JSON.parse(text);
          setData(jsonData);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          throw new Error(`Failed to parse JSON. Raw response: ${text.substring(0, 100)}...`);
        }
          
      } catch (e) {
        console.error('Error fetching or parsing data:', e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading, rawResponse };
};