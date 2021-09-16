export const statusColorClass = (status) => {
  switch (status) {
    case 'NEW':
      return 'new';
    case 'WIP':
      return 'inProgress';
    case 'QUOTE_RECEIVED':
      return 'qtReceived';
    case 'QUOTE_ACCEPTED':
      return 'qtAccepted';
    case 'QUOTE_PO_SUBMIT':
      return 'submitted';
    case 'QUOTE_REJECTED':
      return 'rejected';
    case 'PROJECT_IN_PROGRESS':
      return 'projectInProgress';
    case 'QUOTE_ADMIN_REJECTED':
      return 'adminRejected';
    case 'CLOSED':
      return 'closed';
    default:
      return 'new';
  }
}

export const headerBtn = (status) => {
  switch (status) {
    case 'NEW':
      return 1;
    case 'WIP':
      return 2;
    case 'QUOTE_RECEIVED':
      return 3;
    case 'QUOTE_ACCEPTED':
      return 4;
    case 'QUOTE_PO_SUBMIT':
      return 5;
    case 'QUOTE_REJECTED':
      return 4;
    case 'PROJECT_IN_PROGRESS':
      return 6;
    case 'QUOTE_ADMIN_REJECTED':
      return 6;
    case 'CLOSED':
      return 7;
    default:
      return 1;
  }
}