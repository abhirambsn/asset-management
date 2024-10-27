import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { SIDEBAR_MENU } from '@/utils/constants'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronUp, Plus, User2 } from 'lucide-react'
import { getAvatarUrl } from '@/utils/helper'
import { 
  useQuery,
} from '@tanstack/react-query'
import { useEndpoint } from '@/hooks/endpoint-hook'
import { useCurrentWorkspace } from '@/store/workspace'
import { Link, useNavigate } from 'react-router-dom'
import { useTenant } from '@/hooks/tenant-hook'

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const { workspaceService } = useEndpoint();
  const {tenant} = useTenant();
  const currentUser = "james.corezo";

  const fetchworkspacesByUser = async () => {
    const workspaces = await workspaceService.getWorkspaceByTenantUser(tenant.id, currentUser);
    return workspaces
  }

  const workspaces = useQuery({ queryKey: ['workspaces'], queryFn: fetchworkspacesByUser, staleTime: 1000 * 60 * 60 });
  const {currentWorkspace, setCurrentWorkspace} = useCurrentWorkspace();

  const handleChangeWorkspace = (workspaceId: string) => {
    const workspace = workspaces.data?.find((workspace) => workspace.id === workspaceId);
    if (workspace) {
      setCurrentWorkspace(workspace);
      navigate(`/${workspace.id}`);
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {currentWorkspace ? (
                    <>
                      <img className='w-5 h-5 rounded-lg' src={currentWorkspace.avatar || getAvatarUrl(currentWorkspace.name)} />
                      <span>{currentWorkspace.name}</span>
                    </>
                  ) : "Select workspace"}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
              <DropdownMenuLabel>My Workspaces</DropdownMenuLabel>
              <DropdownMenuSeparator />
                {workspaces.data?.map((workspace) => (
                  <DropdownMenuItem onClick={() => handleChangeWorkspace(workspace.id)} key={workspace.id}>
                    <img className='w-10 h-10 rounded-lg' src={workspace.avatar || getAvatarUrl(workspace.name)} />
                    <span>{workspace.name}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Plus />
                    <span>Create Workspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MENU.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url === "" ? `/${currentWorkspace?.id}` : item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                Workspace Quota: 1/4
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar