using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace Gifter.Domain.Models
{
    public class Gift
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public int Id { get; set; }

        [BsonElement("items")]
        public HashSet<GiftItem> Items { get; set; }
    }
}
