using CollabPlatformApp.Models;

namespace CollabPlatformApp.Hubs.Clients
{
    public interface IChatClient
    {
        System.Threading.Tasks.Task ReceiveMessage(ChatMessage message);
    }
}
