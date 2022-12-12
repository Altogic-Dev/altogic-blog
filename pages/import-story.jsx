import HeadContent from '@/components/general/HeadContent';
import Layout from '@/layouts/Layout';

export default function ImportStory() {
  return (
    <div>
      <HeadContent>
        <title>Altogic Medium Blog App Import a Story</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Import a Story"
        />
        
      </HeadContent>
      <Layout>
        <div className="flex flex-col justify-center items-center h-[500px] gap-8">
          <h1 className="text-3xl font-bold text-center">Import a story</h1>
          <p className="text-center text-gray-500 text-lg">
            Import a story from another publication.
          </p>
          <input
            className="w-96"
            placeholder="http://www.yoursite.org/your-post"
            type="text"
          />
          <div className="flex flex-col justify-center items-center">
            <button
              type="button"
              className="bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Import
            </button>
            <span className="">Please only import content that you own.</span>
          </div>
        </div>
      </Layout>
    </div>
  );
}
