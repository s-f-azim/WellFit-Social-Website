import FollowButton from '../components/FollowButton';
import GetFollow from '../components/GetFollow';
import getFollowingList from '../actions/user';

export default function FollowPage({ data }) {
  // Instead of the hard coded userID there should be a programmed get userID from visiting profile
  return (
    <>
      <FollowButton userId="604d4c18a041b02e9072c983" />
      <GetFollow data={data} />
    </>
  );
}

export async function getStaticProps() {
  const data = await getFollowingList();
  // const data = [
  //   {
  //     _id: '604a2db3d8e54f40a88c4e01',
  //     name: 'Savraj Bassi',
  //   },
  //   {
  //     _id: '604a62f012b9736106657352',
  //     name: 'Issa Kabir',
  //   },
  //   {
  //     _id: '604a62f912b9736106657353',
  //     name: 'Issa Kabir',
  //   },
  //   {
  //     _id: '604a62db12b9736106657351',
  //     name: 'Issa Kabir',
  //   },
  // ];

  return { props: { data } };
}
