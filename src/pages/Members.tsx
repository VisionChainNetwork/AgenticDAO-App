import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Construction } from "lucide-react";

const Members = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Members</h1>
            <p className="text-muted-foreground mt-1">
              DAO member directory and governance participation
            </p>
          </div>
          <Button className="bg-gradient-to-r from-dao-primary to-dao-secondary hover:from-dao-primary/90 hover:to-dao-secondary/90 gap-2">
            <UserPlus className="w-4 h-4" />
            Invite Member
          </Button>
        </div>

        {/* Placeholder Content */}
        <div>
          <Card className="glass-card glow-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Construction className="w-5 h-5 text-dao-warning" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-dao-primary to-dao-secondary rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Member Management Portal
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  The member management interface is currently under
                  development. Here you'll be able to view member profiles,
                  voting history, and contribution analytics.
                </p>
                <div className="space-y-3 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-dao-success rounded-full" />
                    Member directory with roles
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-dao-success rounded-full" />
                    Voting history and participation
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-dao-success rounded-full" />
                    Contribution tracking
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-dao-warning rounded-full" />
                    Delegation management
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Members;
