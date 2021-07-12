using Gifter.Domain.Models;
using Gifter.Domain.Options;
using MongoDB.Driver;

namespace Gifter.Infrastructure
{
    public class GiftContext
    {
        public IMongoCollection<Gift> Gift { get; }


        public GiftContext(GiftContextOptions options)
        {
            var mongo = new MongoClient(options.DatabaseConnection);

            var db = mongo.GetDatabase("gifter");

            Gift = db.GetCollection<Gift>("gift");
        }
    }
}
