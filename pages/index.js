import { useState, useEffect } from 'react';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
       
        const response = await fetch('/api/employees');
        
        const data = await response.json();
    
        setEmployees(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  
  const handleCreateEmployee = async (employee) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      
      if (response.ok) {
        const data = await response.json();
        setEmployees([...employees, data]);
      } else {
        console.error('Error creating employee:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      } else {
        console.error('Error deleting employee:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Employee Management!</h1>
      <EmployeeForm onSubmit={handleCreateEmployee} />
      {isLoading ? (
        <p>Loading employees...</p>
      ) : (
        <EmployeeList
          employees={employees}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default Home;
