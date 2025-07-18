// Mock data for different departments
const mockFiles = [
    // HR Department Files
    { id: 1, code: 'THDC-F-2025-0012', title: 'Employee Leave Application', department: 'HR', status: 'Received', priority: 'Normal', type: 'Physical', requisitioner: 'Alice Johnson', remarks: 'Received at front desk', datetime: '2025-07-08 10:00', currentHolder: 'Alice (Records Office)', createdBy: 'Alice Johnson' },
    { id: 2, code: 'THDC-F-2025-0013', title: 'Salary Revision Request', department: 'HR', status: 'On Hold', priority: 'Urgent', type: 'Digital', requisitioner: 'Bob Smith', remarks: 'Awaiting approval', datetime: '2025-07-08 09:30', currentHolder: 'HR Manager', createdBy: 'Bob Smith' },
    { id: 3, code: 'THDC-F-2025-0014', title: 'New Employee Onboarding', department: 'HR', status: 'Released', priority: 'Normal', type: 'Physical', requisitioner: 'Charlie Brown', remarks: 'Sent to IT for system access', datetime: '2025-07-07 16:45', currentHolder: 'IT Department', createdBy: 'Charlie Brown' },
    
    // Finance Department Files
    { id: 4, code: 'THDC-F-2025-0015', title: 'Budget Approval Request', department: 'Finance', status: 'Received', priority: 'Urgent', type: 'Digital', requisitioner: 'Diana Wilson', remarks: 'Received by Finance', datetime: '2025-07-08 11:00', currentHolder: 'Finance Manager', createdBy: 'Diana Wilson' },
    { id: 5, code: 'THDC-F-2025-0016', title: 'Expense Reimbursement', department: 'Finance', status: 'Complete', priority: 'Normal', type: 'Physical', requisitioner: 'Eve Davis', remarks: 'Processed and approved', datetime: '2025-07-07 14:20', currentHolder: 'Completed', createdBy: 'Eve Davis' },
    { id: 6, code: 'THDC-F-2025-0017', title: 'Purchase Order Approval', department: 'Finance', status: 'On Hold', priority: 'Urgent', type: 'Digital', requisitioner: 'Frank Miller', remarks: 'Awaiting vendor details', datetime: '2025-07-07 13:15', currentHolder: 'Procurement', createdBy: 'Frank Miller' },
    
    // IT Department Files
    { id: 7, code: 'THDC-F-2025-0018', title: 'Software License Renewal', department: 'IT', status: 'Received', priority: 'Urgent', type: 'Digital', requisitioner: 'Grace Lee', remarks: 'Received by IT', datetime: '2025-07-08 12:30', currentHolder: 'IT Manager', createdBy: 'Grace Lee' },
    { id: 8, code: 'THDC-F-2025-0019', title: 'Hardware Purchase Request', department: 'IT', status: 'Released', priority: 'Normal', type: 'Physical', requisitioner: 'Henry Taylor', remarks: 'Sent to Procurement', datetime: '2025-07-07 15:45', currentHolder: 'Procurement', createdBy: 'Henry Taylor' },
    { id: 9, code: 'THDC-F-2025-0020', title: 'System Maintenance Report', department: 'IT', status: 'Complete', priority: 'Normal', type: 'Digital', requisitioner: 'Ivy Chen', remarks: 'Maintenance completed', datetime: '2025-07-06 16:00', currentHolder: 'Completed', createdBy: 'Ivy Chen' },
    
    // Administration Department Files
    { id: 10, code: 'THDC-F-2025-0021', title: 'Office Space Allocation', department: 'Administration', status: 'Received', priority: 'Normal', type: 'Physical', requisitioner: 'Jack Wilson', remarks: 'Received at admin desk', datetime: '2025-07-08 09:00', currentHolder: 'Admin Manager', createdBy: 'Jack Wilson' },
    { id: 11, code: 'THDC-F-2025-0022', title: 'Facility Maintenance Request', department: 'Administration', status: 'On Hold', priority: 'Urgent', type: 'Digital', requisitioner: 'Kate Johnson', remarks: 'Awaiting contractor quote', datetime: '2025-07-07 17:30', currentHolder: 'Admin Manager', createdBy: 'Kate Johnson' },
    
    // Procurement Department Files
    { id: 12, code: 'THDC-F-2025-0023', title: 'Vendor Contract Review', department: 'Procurement', status: 'Received', priority: 'Urgent', type: 'Physical', requisitioner: 'Liam Brown', remarks: 'Received by Procurement', datetime: '2025-07-08 08:30', currentHolder: 'Procurement Manager', createdBy: 'Liam Brown' },
    { id: 13, code: 'THDC-F-2025-0024', title: 'Supplier Evaluation Report', department: 'Procurement', status: 'Released', priority: 'Normal', type: 'Digital', requisitioner: 'Mia Garcia', remarks: 'Sent to Finance for approval', datetime: '2025-07-07 10:15', currentHolder: 'Finance Department', createdBy: 'Mia Garcia' },
    
    // Legal Department Files
    { id: 14, code: 'THDC-F-2025-0025', title: 'Contract Review Request', department: 'Legal', status: 'Received', priority: 'Urgent', type: 'Physical', requisitioner: 'Noah Martinez', remarks: 'Received by Legal', datetime: '2025-07-08 13:45', currentHolder: 'Legal Manager', createdBy: 'Noah Martinez' },
    { id: 15, code: 'THDC-F-2025-0026', title: 'Compliance Documentation', department: 'Legal', status: 'Complete', priority: 'Normal', type: 'Digital', requisitioner: 'Olivia Davis', remarks: 'Documentation completed', datetime: '2025-07-06 11:20', currentHolder: 'Completed', createdBy: 'Olivia Davis' }
  ];
  
  const mockFileMovements = [
    // HR Files
    { fileId: 'THDC-F-2025-0012', movements: [
      { user: 'Alice (Records Office)', action: 'Received', remarks: 'Received at front desk', datetime: '2025-07-08 10:00', icon: '📥', sentBy: null, sentThrough: null, recipientName: null },
      { user: 'HR Manager', action: 'On Hold', remarks: 'Under review', datetime: '2025-07-08 09:30', icon: '🕒', sentBy: null, sentThrough: null, recipientName: null },
      { user: 'HR Manager', action: 'Forwarded', remarks: 'Forwarded to Finance for budget approval', datetime: '2025-07-08 14:00', icon: '📤', sentBy: 'HR Manager', sentThrough: 'internal-mail', recipientName: 'Finance Manager' }
    ]},
    { fileId: 'THDC-F-2025-0013', movements: [
      { user: 'Bob (HR)', action: 'Released', remarks: 'Sent to HR', datetime: '2025-07-08 09:30', icon: '📤', sentBy: 'Bob (HR)', sentThrough: 'hand-delivery', recipientName: 'HR Manager' },
      { user: 'HR Manager', action: 'On Hold', remarks: 'Awaiting signature', datetime: '2025-07-07 16:45', icon: '🕒', sentBy: null, sentThrough: null, recipientName: null }
    ]},
    
    // Finance Files
    { fileId: 'THDC-F-2025-0015', movements: [
      { user: 'Finance Manager', action: 'Received', remarks: 'Received by Finance', datetime: '2025-07-08 11:00', icon: '📥', sentBy: null, sentThrough: null, recipientName: null },
      { user: 'Diana (Finance)', action: 'On Hold', remarks: 'Awaiting budget approval', datetime: '2025-07-08 10:30', icon: '🕒', sentBy: null, sentThrough: null, recipientName: null },
      { user: 'Diana (Finance)', action: 'Forwarded', remarks: 'Forwarded to Procurement for vendor details', datetime: '2025-07-08 15:30', icon: '📤', sentBy: 'Diana (Finance)', sentThrough: 'email', recipientName: 'Procurement Manager' }
    ]},
    
    // IT Files
    { fileId: 'THDC-F-2025-0018', movements: [
      { user: 'IT Manager', action: 'Received', remarks: 'Received by IT', datetime: '2025-07-08 12:30', icon: '📥', sentBy: null, sentThrough: null, recipientName: null },
      { user: 'Grace (IT)', action: 'Released', remarks: 'Sent to Procurement', datetime: '2025-07-08 12:00', icon: '📤', sentBy: 'Grace (IT)', sentThrough: 'courier', recipientName: 'Procurement Manager' }
    ]}
  ];
  
  // Enhanced file forwarding data
  const mockFileForwards = [
    {
      id: 1,
      fileId: 'THDC-F-2025-0012',
      action: 'forward',
      recipientDepartment: 'Finance',
      recipientName: 'Finance Manager', // Attention to
      sentBy: 'HR Manager',
      sentThrough: 'internal-mail',
      priority: 'Important',
      trackingNumber: 'INT-2025-001',
      remarks: 'Forwarded for budget approval',
      deadline: '2025-01-15',
      isUrgent: false,
      datetime: '2025-07-08 14:00',
      status: 'In Transit'
    },
    {
      id: 2,
      fileId: 'THDC-F-2025-0015',
      action: 'forward',
      recipientDepartment: 'Procurement',
      recipientName: 'Procurement Team', // Attention to
      sentBy: 'Diana (Finance)',
      sentThrough: 'email',
      priority: 'Critical',
      trackingNumber: 'EMAIL-2025-002',
      remarks: 'Forwarded to Procurement for vendor details',
      deadline: '2025-01-10T16:00',
      isUrgent: true,
      datetime: '2025-07-08 15:30',
      status: 'Delivered'
    }
  ];
  
  export const getFilesByDepartment = (department) => {
    if (!department) return [];
    return mockFiles.filter(file => file.department === department);
  };
  
  export const getAllFiles = () => {
    return mockFiles;
  };
  
  export const getFileMovements = (fileId) => {
    const fileMovement = mockFileMovements.find(fm => fm.fileId === fileId);
    return fileMovement ? fileMovement.movements : [];
  };
  
  export const getAllFileMovements = () => {
    // Returns a flat array of all movements with fileId
    return mockFileMovements.flatMap(fm =>
      fm.movements.map(m => ({ ...m, fileId: fm.fileId }))
    );
  };
  
  export const getDashboardStats = (department) => {
    const files = department ? getFilesByDepartment(department) : getAllFiles();
    
    const today = new Date().toISOString().split('T')[0];
    const todayFiles = files.filter(file => file.datetime.includes(today));
    
    return {
      totalToday: todayFiles.length,
      pending: files.filter(f => f.status === 'On Hold').length,
      completed: files.filter(f => f.status === 'Complete').length,
      departmentBreakdown: department ? null : getDepartmentBreakdown()
    };
  };
  
  export const getDepartmentBreakdown = () => {
    const departments = ['HR', 'Finance', 'IT', 'Administration', 'Procurement', 'Legal'];
    return departments.map(dept => ({
      department: dept,
      count: mockFiles.filter(f => f.department === dept).length
    }));
  };
  
  export const searchFiles = (searchTerm, department) => {
    const files = department ? getFilesByDepartment(department) : getAllFiles();
    return files.filter(file =>
      file.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.requisitioner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // File forwarding functions
  export const getFileForwards = (fileId = null) => {
    if (fileId) {
      return mockFileForwards.filter(forward => forward.fileId === fileId);
    }
    return mockFileForwards;
  };
  
  export const createFileForward = (forwardData) => {
    const newForward = {
      id: mockFileForwards.length + 1,
      ...forwardData,
      datetime: new Date().toISOString(),
      status: 'In Transit'
    };
    
    // Add to mock data (in real app, this would be an API call)
    mockFileForwards.push(newForward);
    
    // Update file movements
    const fileMovement = mockFileMovements.find(fm => fm.fileId === forwardData.fileId);
    if (fileMovement) {
      fileMovement.movements.push({
        user: forwardData.sentBy,
        action: forwardData.action === 'forward' ? 'Forwarded' : 'Sent',
        remarks: forwardData.remarks,
        datetime: newForward.datetime,
        icon: '📤',
        sentBy: forwardData.sentBy,
        sentThrough: forwardData.sentThrough,
        recipientName: forwardData.recipientName,
        deadline: forwardData.deadline
      });
    }
    
    return newForward;
  };
  
  export const getForwardDetails = (forwardId) => {
    return mockFileForwards.find(forward => forward.id === forwardId);
  };
  
  export const updateForwardStatus = (forwardId, status) => {
    const forward = mockFileForwards.find(f => f.id === forwardId);
    if (forward) {
      forward.status = status;
      forward.lastUpdated = new Date().toISOString();
    }
    return forward;
  }; 
  
  // File creation function
  export const createFile = (fileData) => {
    const currentYear = new Date().getFullYear();
    const fileCount = mockFiles.filter(f => f.code.includes(`THDC-F-${currentYear}`)).length + 1;
    const fileId = `THDC-F-${currentYear}-${String(fileCount).padStart(4, '0')}`;
    
    const newFile = {
      id: mockFiles.length + 1,
      code: fileId,
      title: fileData.title,
      department: fileData.department,
      status: 'Created',
      priority: fileData.priority,
      type: fileData.isDigital ? 'Digital' : 'Physical',
      requisitioner: fileData.createdBy,
      remarks: fileData.remarks || 'File created',
      datetime: new Date().toISOString(),
      currentHolder: fileData.createdBy,
      createdBy: fileData.createdBy,
      createdAt: new Date().toISOString()
    };
    
    // Add to mock data
    mockFiles.push(newFile);
    
    // Add initial movement
    const newMovement = {
      fileId: fileId,
      movements: [
        {
          user: fileData.createdBy,
          action: 'Created',
          remarks: fileData.remarks || 'File created',
          datetime: newFile.datetime,
          icon: '📄',
          sentBy: null,
          sentThrough: null,
          recipientName: null
        }
      ]
    };
    
    mockFileMovements.push(newMovement);
    
    return newFile;
  };
  
  // Get files created by a specific user
  export const getFilesByCreator = (creatorName) => {
    return mockFiles.filter(file => file.createdBy === creatorName);
  };
  
  // Get files assigned to a specific user
  export const getFilesByAssignee = (assigneeName) => {
    return mockFiles.filter(file => file.currentHolder === assigneeName || file.requisitioner === assigneeName);
  }; 
  
  // Helper function to check if a file is overdue
  export const isFileOverdue = (deadline) => {
    if (!deadline) return false;
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    
    return now > deadlineDate;
  };
  
  // Helper function to get time remaining until deadline
  export const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;
    
    if (diff <= 0) {
      return 'Overdue';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    } else {
      return 'Less than 1 hour remaining';
    }
  };
  
  // Helper function to format deadline for display
  export const formatDeadline = (deadline) => {
    if (!deadline) return 'No deadline set';
    
    const deadlineDate = new Date(deadline);
    const isOverdue = isFileOverdue(deadline);
    
    if (deadline.includes('T')) {
      // Has time component
      return {
        date: deadlineDate.toLocaleDateString(),
        time: deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOverdue,
        fullText: `${deadlineDate.toLocaleDateString()} at ${deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
    } else {
      // Date only
      return {
        date: deadlineDate.toLocaleDateString(),
        time: null,
        isOverdue,
        fullText: deadlineDate.toLocaleDateString()
      };
    }
  }; 
  
  // Add bulk mock files for each department
  const departments = ['HR', 'Finance', 'IT', 'Administration', 'Procurement', 'Legal'];
  const statuses = ['Received', 'Sent', 'On Hold', 'Released', 'Complete'];
  const priorities = ['Normal', 'Urgent', 'Important', 'Critical'];
  const types = ['Physical', 'Digital'];
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Wilson', 'Eve Davis', 'Frank Miller', 'Grace Lee', 'Henry Taylor', 'Ivy Chen', 'Jack Wilson', 'Kate Johnson', 'Liam Brown', 'Mia Garcia', 'Noah Martinez', 'Olivia Davis', 'Paul Adams', 'Quinn Evans', 'Rita Patel', 'Sam Lee', 'Tina Gupta'];
  
  let idCounter = mockFiles.length;
  
  departments.forEach((dept, dIdx) => {
    statuses.forEach((status, sIdx) => {
      for (let i = 0; i < 20; i++) {
        const id = ++idCounter;
        const code = `THDC-F-2025-${String(id).padStart(4, '0')}`;
        const title = `${dept} ${status} File ${i + 1}`;
        const priority = priorities[(i + sIdx) % priorities.length];
        const type = types[(i + sIdx) % types.length];
        const requisitioner = names[(i + dIdx + sIdx) % names.length];
        const remarks = `${status} for ${dept}`;
        const datetime = `2025-07-${String(8 + (i % 5)).padStart(2, '0')} ${String(8 + (i % 10)).padStart(2, '0')}:00`;
        const currentHolder = names[(i + dIdx + sIdx + 1) % names.length];
        const createdBy = requisitioner;
        mockFiles.push({ id, code, title, department: dept, status, priority, type, requisitioner, remarks, datetime, currentHolder, createdBy });
        // Add mock movements
        mockFileMovements.push({
          fileId: code,
          movements: [
            { user: createdBy, action: 'Created', remarks: `File created by ${createdBy}`, datetime, icon: '📄', sentBy: null, sentThrough: null, recipientName: null },
            { user: currentHolder, action: status, remarks: remarks, datetime, icon: status === 'Received' ? '📥' : status === 'Sent' ? '📤' : status === 'Complete' ? '✅' : status === 'Released' ? '📤' : '🕒', sentBy: createdBy, sentThrough: 'internal-mail', recipientName: currentHolder }
          ]
        });
        // Add mock forwards for some files
        if (i % 4 === 0) {
          mockFileForwards.push({
            id: mockFileForwards.length + 1,
            fileId: code,
            action: 'forward',
            recipientDepartment: dept,
            recipientName: currentHolder,
            sentBy: createdBy,
            sentThrough: 'internal-mail',
            priority,
            trackingNumber: `INT-2025-${id}`,
            remarks: `Forwarded for ${dept} review`,
            deadline: `2025-01-${String(10 + (i % 10)).padStart(2, '0')}`,
            isUrgent: priority === 'Urgent' || priority === 'Critical',
            datetime,
            status: status === 'Sent' ? 'In Transit' : 'Delivered'
          });
        }
      }
    });
  }); 