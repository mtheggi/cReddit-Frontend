function Subtitle({ title }) {
  return (
    <>
      <h6 className="text-gray-600 text-xs font-bold font-plex mt-5">
        {title}
      </h6>
      <hr className="border-gray-500 w-100% max-w-3xl" />
    </>
  );
}

export default Subtitle;
