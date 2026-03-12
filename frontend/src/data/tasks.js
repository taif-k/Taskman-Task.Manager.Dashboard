import sampleImg from "../assets/images/sample_img.webp";


export const initialTasks = {
  newTask: [
    {
      id: '1',
      name: 'NFT Collections',
      description: 'Create NFT landing page',
      startDate: '2024-01-12',
      endDate: '2024-03-31',
      label: 'Ads',
      progress: 18,
      image: sampleImg,
      comments: 17,
      isDemo: true,
      attachments: 10
    },
    {
      id: '2',
      name: 'NFT Collections',
      description: 'Create NFT landing page',
      startDate: '2024-01-12',
      endDate: '2024-03-31',
      label: 'business',
      progress: 65,
      comments: 17,
      image: sampleImg,
      isDemo: true, 
      attachments: 10
    }
  ],
  inProgress: [ {
      id: '3',
      name: 'NFT Collections',
      description: 'Create NFT landing page',
      startDate: '2024-01-12',
      endDate: '2024-03-31',
      label: 'Stock',
      progress: 80,
      image: sampleImg,
      comments: 17,
      attachments: 10
    }],
  doneTask: []
};
