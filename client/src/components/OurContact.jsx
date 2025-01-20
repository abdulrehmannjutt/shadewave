const LegalContactCard = () => {
  return (
    //<div className="w-full p-6">
    <div className="w-full max-w-md shadow-lg bg-white p-4 rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Have legal queries? Leave them to us.
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          If you have any questions, comments, or need assistance, don&#39;t
          hesitate to reach out! Please fill out the form below, and we&#39;ll
          get back to you as soon as possible.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-dotted border-mainColor py-2">
          <svg
            className="text-mainColor w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.62 10.79a15.478 15.478 0 006.59 6.59l2.2-2.2a1.004 1.004 0 011.11-.21c1.12.47 2.33.73 3.58.73.55 0 1 .45 1 1v3.4c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.4c.55 0 1 .45 1 1 0 1.25.26 2.46.73 3.58.15.37.07.79-.22 1.09l-2.2 2.2z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Phone & Whatsapp</p>
            <p>
              <a href="tel:0329-6282733">0329-6282733</a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-dotted border-mainColor py-2">
          <svg
            className="w-5 h-5 text-mainColor"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>
              <a href="mailto:sales@eespark.com">sales@eespark.com</a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-dotted border-mainColor py-2">
          <svg
            className="w-5 h-5 text-mainColor"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>
              <a href="mailto:sales@eespark.com">eespark733@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-dotted border-mainColor py-2">
          <svg
            className="text-mainColor w-5 h-5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 7a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h3V8a1 1 0 011-1zm0-5C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500">Working Hours</p>
            <p>9:00 am - 6:00 pm Monday to Friday</p>
          </div>
        </div>
      </div>
    </div>
    //</div>
  );
};

export default LegalContactCard;
