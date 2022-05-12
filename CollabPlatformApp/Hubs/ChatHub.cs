using CollabPlatformApp.Hubs.Clients;
using CollabPlatformApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace CollabPlatformApp.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async System.Threading.Tasks.Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}
